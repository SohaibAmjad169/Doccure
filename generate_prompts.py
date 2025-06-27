import json
import random
from datetime import datetime, timedelta
import argparse
import os

# Load doctor data
with open("src/database/doctorList.json", "r") as file:
    doctor_data = json.load(file)


# Function to generate a random appointment prompt
def generate_random_appointment_prompt():
    specialties = [
        "Cardiologist",
        "Dentist",
        "Pediatrician",
        "Dermatologist",
        "Orthopedist",
        "Neurologist",
        "Gynecologist",
        "Ophthalmologist",
        "Psychiatrist",
        "Endocrinologist",
        "Gastroenterologist",
        "Nephrologist",
        "Rheumatologist",
        "Urologist",
        "Infectious Disease Specialist",
        "General Surgeon",
        "Plastic Surgeon",
        "Allergist",
        "Obstetrician-Gynecologist",
        "Radiologist",
        "Anesthesiologist",
        "Pulmonologist",
    ]
    locations = list(set([doctor["location"] for doctor in doctor_data]))

    selected_specialty = random.choice(specialties)
    selected_location = random.choice(locations)

    today = datetime.now()
    random_year = today.year + random.randint(-10, 10)
    random_month = random.randint(1, 12)
    random_day = random.randint(1, 28)  # To avoid invalid dates like February 30
    random_date = datetime(random_year, random_month, random_day)

    appointment_day = random_date.strftime("%B %d, %Y")
    appointment_time = random.choice(
        ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"]
    )

    appointment_details = {
        "selected_specialty": selected_specialty,
        "selected_location": selected_location,
        "appointment_day": appointment_day,
        "appointment_time": appointment_time,
    }

    return appointment_details


# Function to generate a random name
def get_random_name():
    first_names = [
        "Sarah",
        "John",
        "Emily",
        "Michael",
        "Sophia",
        "Daniel",
        "Ava",
        "James",
        "Emma",
        "Liam",
        "Olivia",
        "Noah",
        "Isabella",
        "Ethan",
        "Mia",
        "Lucas",
        "Charlotte",
        "Mason",
        "Amelia",
        "Elijah",
        "Harper",
    ]
    last_names = [
        "Smith",
        "Johnson",
        "Brown",
        "Taylor",
        "Anderson",
        "Thomas",
        "Jackson",
        "White",
        "Harris",
        "Martin",
        "Clark",
        "Lewis",
        "Walker",
        "Hall",
        "Allen",
        "Young",
        "King",
        "Wright",
        "Scott",
        "Adams",
    ]

    return f"{random.choice(first_names)} {random.choice(last_names)}"


# Function to generate random contact details
def get_random_contact():
    phone = f"{random.randint(1000000000, 9999999999)}"
    email_providers = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "mail.com",
        "doccure.com",
    ]
    email = f"user{random.randint(1000, 9999)}@{random.choice(email_providers)}"
    return phone, email


# Function to generate random payment details
def generate_random_payment_details():
    card_name = get_random_name()
    card_number = "".join([str(random.randint(0, 9)) for _ in range(16)])
    expiry_month = str(random.randint(1, 12)).zfill(2)
    expiry_year = str(random.randint(1, 99)).zfill(2)
    cvv = str(random.randint(100, 999))

    return {
        "paymentMethod": "Credit Card",
        "cardName": card_name,
        "cardNumber": card_number,
        "expiryMonth": expiry_month,
        "expiryYear": expiry_year,
        "cvv": cvv,
    }


# Function to create booking result
def create_booking_result(doctor, appointment_details, user_data):
    payment_details = generate_random_payment_details()

    selected_day = datetime.strptime(
        appointment_details["appointment_day"], "%B %d, %Y"
    ).strftime("%a")

    formatted_result_date = datetime.strptime(
        appointment_details["appointment_day"], "%B %d, %Y"
    ).strftime("%d-%m-%Y")

    booking_result = {
        "userDetails": user_data,
        "bookingDetails": {
            "selectedDate": formatted_result_date,
            "selectedDay": selected_day,
            "selectedTime": appointment_details["appointment_time"],
            "doctorDetails": {
                "name": doctor["doctorName"],
                "speciality": doctor["specialty"],
                "clinic": doctor["clinicName"],
                "location": doctor["location"],
                "contact": {
                    "phone": doctor["contact"]["phone"],
                    "email": doctor["contact"]["email"],
                },
                "appointmentFee": doctor["appointmentFee"],
            },
        },
        "paymentDetails": payment_details,
    }

    return booking_result, formatted_result_date


# Function to generate prompts with results
def create_prompts_with_results(num_prompts, output_file):
    output_list = []

    prompt_templates = [
        "Hi, I am looking for a {clinic} at {location} that specializes in {speciality}. It has to be nearby. Also, I might need an appointment. My details are {first} {last} and my contact information is {phone}, {email}, you can choose this {selectedTime}, {selectedDate}, {selectedDay}, my payment information is  {cardName}, {cardNumber}, {cvv}, Expiry:  {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I want to visit a {speciality} {clinic} very soon. It has to be at {location}. Also, tell me the process for booking an appointment. I {first} {last} with my contact information. {phone}, {email}, this time is better for me {selectedTime}, {selectedDate}, {selectedDay}, {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "Hi, i want to book an appointment for {speciality} {clinic} around {location}.  I am feeling a fever. I will provide you with my information {first} {last}, my phone {phone}, and {email}.please select {selectedTime}, and {selectedDate}, {selectedDay}, Card Information: {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I think I have to meet a {speciality} doctor. I want you to book an appointment at {clinic} .I have my information: {first} {last}, {email}, {phone}, choose the slot at {selectedTime}, {selectedDate}, {selectedDay}, Card Information: {cardName}, {cardNumber}, {cvv}, Expiry:  {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "Hello, I want to book an appointment with a {speciality} doctor, and I prefer a {clinic} near {location}. My name is {first} {last}. My contact information is {phone}, {email}. I prefered this {selectedTime}, {selectedDate}, {selectedDay}. my payment information is {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I am looking to book an appointment for a {clinic} that offers {speciality} services. I want to check the clinic at {location} because it is near to me. My name is {first} {last}, {phone}, {email}, the slot at {selectedTime}, {selectedDate}, {selectedDay}, Card Information:  {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I want you to book an appointment at {clinic} with {speciality} at {location} so that I can book a slot for {selectedDay}, {selectedDate} My information is {first} {last}, {phone}, {email}. My card information is {cardName}, {cardNumber}, {cvv},Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}. Please save it for the next time.",
        "I mean to say that I have to book an appointment for {speciality} {clinic}. Give me the details of available slots {selectedTime}, {selectedDate}, {selectedDay} at {location}. My information includes {first} {last}, {phone}, {email}. I will also provide you with my card information. {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "Hi, I want to schedule a check-up for me at a {speciality} {clinic} at {location}. Give me the earliest possible slot at {selectedTime}, {selectedDate}, {selectedDay}, so that I can get myself checked. I {first} {last}, with my contact information {phone}, {email}, and the payment details are {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I need to book an appointment to meet the doctor soon. Give me the details of most reliable {speciality} {clinic}, and it will be near {location}. The time will be {selectedTime}, and the date will be {selectedDate} on {selectedDay}. I will provide you my information including card information. {first} {last}, {phone}, {email}.Payment Details {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/ {expiryYear}, {paymentMethod}.",
        "I have been looking , to book an appointment and I think I have to visit a {speciality} specialist. This {clinic} that is near me at {location}. The date and time will be {selectedDate}, {selectedTime}, {selectedDay}. I {first} {last}, {phone}, {email}, with my card information {cardName}, {cardNumber}, {cvv}, expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "i want to visit  a doctor  who has {speciality} expertise and works at a {clinic}? I want to get checked this week {selectedDate}, {selectedDay}, {selectedTime} at {location}. I {first} {last}, my phone number is {phone} and my email is {email}. Payment information is {cardName}, {cardNumber}, {cvv}, {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "Hi, i am looking to book an appointment at {clinic} with a good {speciality} doctor. I suggest you check the clinic at {location} because it is near my home. The schedule that suits me is {selectedDate}, {selectedDay}, {selectedTime}. My information is {first} {last}, {phone}, {email}.My Card Details {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I have been looking for an appointment go for {speciality} treatment. If you have any information regarding {clinic} at {location}, I will appreciate it. Choose any slot for me that is very soon. {selectedDate}, {selectedDay}, {selectedTime}. My information is {first} {last}, {phone}, {email}.Payment information {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I am looking to book an appointment. And I need your help to find {speciality} {clinic} near {location} for me. Book the slot {selectedTime}, {selectedDate}, {selectedDay}. I am {first} {last}, contact information {phone}, {email}.Card Details are {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I want to book an appointment for the {clinic} for {speciality} at {location}? I want to book an appointment as soon as possibl. It will be at {selectedDate}, {selectedTime}, {selectedDay}. I {first} {last}, my contact information is {phone}, {email}. My payment information is {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I want to get appointed by a {speciality} expert, but I don't know where I will find {clinic}. location will be  at {location}. Any schedule that is at {selectedTime} suits me, {selectedDate}, {selectedDay}. I {first} {last}, my contact information {phone}, {email}. My card information is {cardName}, {cardNumber}, {cvv},Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "Today, I looking to book an appointment of {speciality} {clinic}. Help me out by sorting this. My home is in {location}. This {selectedDate}, {selectedDay}, {selectedTime} will suit me. My name is {first} {last}, phone {phone}, email {email}. My payment information is {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}, {paymentMethod}.",
        "I want to book an appointment at {clinic} at {location}. I need a {speciality} specialist. My information is {first} {last}, Contact {phone}, {email}. I would like {selectedDay}, {selectedDate} at {selectedTime}. My payment information is {paymentMethod}, {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}.",
        "I want to book an appointment at {clinic} in {location}. I need a {speciality} doctor, I {first} {last}. My phone number {phone} and email {email}. Help me get a slot on {selectedDay}, {selectedDate}, at {selectedTime}. I will be paying with {paymentMethod}, {cardName}, {cardNumber}, {cvv}, Expiry: {expiryMonth}/{expiryYear}.",
    ]

    for _ in range(num_prompts):
        while True:
            appointment_details = generate_random_appointment_prompt()

            matching_doctors = [
                doctor
                for doctor in doctor_data
                if doctor["specialty"] == appointment_details["selected_specialty"]
                and doctor["location"] == appointment_details["selected_location"]
            ]

            if not matching_doctors:
                continue

            doctor = sorted(matching_doctors, key=lambda x: x["doctorName"])[0]
            break

        name = get_random_name()
        first, last = name.split()
        phone, email = get_random_contact()
        user_data = {
            "firstName": first,
            "lastName": last,
            "email": email,
            "phone": phone,
        }

        selected_day = datetime.strptime(
            appointment_details["appointment_day"], "%B %d, %Y"
        ).strftime("%a")

        formatted_date = appointment_details["appointment_day"]

        booking_result, formatted_result_date = create_booking_result(
            doctor, appointment_details, user_data
        )

        template = random.choice(prompt_templates)

        prompt = template.format(
            speciality=appointment_details["selected_specialty"],
            clinic=doctor["clinicName"],
            location=doctor["location"],
            first=first,
            last=last,
            email=email,
            phone=phone,
            selectedDate=formatted_date,
            selectedDay=selected_day,
            selectedTime=appointment_details["appointment_time"],
            cardName=booking_result["paymentDetails"]["cardName"],
            cardNumber=booking_result["paymentDetails"]["cardNumber"],
            cvv=booking_result["paymentDetails"]["cvv"],
            expiryMonth=booking_result["paymentDetails"]["expiryMonth"],
            expiryYear=booking_result["paymentDetails"]["expiryYear"],
            paymentMethod="Credit Card",
        )

        output_list.append(
            {
                "prompt": prompt,
                "bookingResults": booking_result,
            }
        )

    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(output_list, file, indent=4)

    print(f"Generated prompts and saved to {output_file}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate booking prompts and results."
    )
    parser.add_argument(
        "-n",
        "--num_prompts",
        type=int,
        default=20,
        help="Number of Doctor Appointment prompts to generate).",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        default="generated_prompts.json",
        help="Output file to save the prompts and results (default: 'generated_prompts.json').",
    )

    args = parser.parse_args()

    create_prompts_with_results(args.num_prompts, args.output)
