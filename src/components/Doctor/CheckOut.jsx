import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Backdrop, Fade, Switch, FormControlLabel, TextField, MenuItem, Select, Button, Grid, Box, Typography } from '@mui/material';
import { setCurrentBookingDetails, addBookingResult } from '../../redux/action/bookingAction';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { doctorDetails, selectedDay, selectedTime, selectedDate } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));

        if (!bookingResults || bookingResults === undefined || bookingResults.lenght === 0) {
            window.bookingResults = [];
            localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
        } else {
            window.bookingResults = bookingResults
        }
    }, []);

    const navigate = useNavigate()
    // Set up state for personal and payment details
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        paymentMethod: 'Credit Card',
        cardName: '',
        cardNumber: '',
        expiryMonth: '01',
        expiryYear: '24',
        cvv: '',
        termsAccepted: false,
    });

    useEffect(() => {
        const bookingDetails = {
            bookingDetails: {
                selectedDay: selectedDay,
                selectedTime: selectedTime,
                selectedDate: selectedDate,
                doctorDetails: {
                    name: doctorDetails?.doctorName,
                    speciality: doctorDetails?.specialty,
                    clinic: doctorDetails?.clinicName,
                    location: doctorDetails?.address,
                    contact: doctorDetails?.contact,
                    appointmentFee: doctorDetails?.appointmentFee,
                }
            },
            userDetails: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
            },

            paymentDetails: {
                paymentMethod: formData.paymentMethod,
                cardName: formData.cardName,
                cardNumber: formData.cardNumber,
                expiryMonth: formData.expiryMonth,
                expiryYear: formData.expiryYear,
                cvv: formData.cvv,
            },
            isFinalPage: true,
        };

        window.currentBookingInfo = bookingDetails;
        localStorage.setItem('currentBookingInfo', JSON.stringify(bookingDetails));
        dispatch(setCurrentBookingDetails(bookingDetails));
    }, [formData, selectedDate, doctorDetails, selectedDay, selectedTime, dispatch]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "expiryMonth" || name === "expiryYear") {
            if (value.length > 2) return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic Validation
        const cardNumberValid = formData.cardNumber.length === 16;
        const cvvValid = formData.cvv.length === 3;

        if (!cardNumberValid) {
            toast.error('Card number must be 16 digits');
            return;
        }

        if (!cvvValid) {
            toast.error('CVV must be 3 digits');
            return;
        }

        const bookingDetails = {
            userDetails: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
            },
            paymentDetails: {
                paymentMethod: formData.paymentMethod,
                cardName: formData.cardName,
                cardNumber: formData.cardNumber,
                expiryMonth: formData.expiryMonth,
                expiryYear: formData.expiryYear,
                cvv: formData.cvv,
            },
            bookingDetails: {
                selectedDay: selectedDay,
                selectedTime: selectedTime,
                selectedDate: selectedDate,
                doctorDetails: {
                    name: doctorDetails?.doctorName,
                    speciality: doctorDetails?.specialty,
                    clinic: doctorDetails?.clinicName,
                    location: doctorDetails?.location,
                    contact: doctorDetails?.contact,
                    appointmentFee: doctorDetails?.appointmentFee,
                }
            },
        };

        if (!Array.isArray(window.bookingResults)) {
            window.bookingResults = [];
        }
        window.bookingResults.push(bookingDetails);
        dispatch(addBookingResult(bookingDetails))
        toast.success('Booking Confirmed!');
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        localStorage.setItem('currentBookingInfo', JSON.stringify({}));
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            paymentMethod: 'Credit Card',
            cardName: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            termsAccepted: false,
        });
        setIsModalOpen(false);
        navigate('/');
    };


    if (!doctorDetails || !selectedDay || !selectedTime) {
        return <div className="text-center text-red-600 font-semibold">Invalid booking information.</div>;
    }

    return (
        <>
            <Toaster />
            <div className="max-w-7xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg my-[100px] overflow-hidden">
                <Grid container spacing={6}>
                    {/* Left Column: Form */}
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                            Book Appointment
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <Box mb={4} sx={{ borderBottom: '2px solid #ddd', paddingBottom: '16px' }}>
                                <Typography variant="h6" fontWeight="500" color="text.secondary" mb={2}>
                                    Personal Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Payment Information */}
                            <Box mb={4} sx={{ borderBottom: '2px solid #ddd', paddingBottom: '16px' }}>
                                <Typography variant="h6" fontWeight="500" color="text.secondary" mb={2}>
                                    Payment Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Select
                                                    sx={{ marginLeft: '10px' }}
                                                    name="paymentMethod"
                                                    value={formData.paymentMethod}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                >
                                                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                                                </Select>
                                            }
                                            label=""
                                        />
                                    </Grid>

                                    {formData.paymentMethod === 'Credit Card' && (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Cardholder Name"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Card Number"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Expiry Month"
                                                    name="expiryMonth"
                                                    value={formData.expiryMonth}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    type='number'
                                                    maxlenght='2'
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Expiry Year"
                                                    name="expiryYear"
                                                    value={formData.expiryYear}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    required
                                                    type='number'
                                                    maxlenght='2'
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="CVV"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Box>

                            {/* Terms and Conditions */}
                            <Box mb={4}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={!!formData.termsAccepted} // Ensure `checked` is a boolean
                                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                            color="primary"
                                        />


                                    }
                                    label="I accept the terms and conditions"
                                />
                            </Box>

                            {/* Confirm Booking Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!formData.termsAccepted}
                                sx={{
                                    padding: '12px',
                                    textTransform: 'none',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    '&:hover': { backgroundColor: '#1976d2' },
                                }}
                            >
                                Confirm Booking
                            </Button>
                        </form>
                    </Grid>

                    {/* Right Column: Doctor Details */}
                    <Grid item xs={12} sx={{ marginTop: "40px" }} lg={6}>
                        <Box sx={{ backgroundColor: '#f5f5f5', p: 4, borderRadius: '8px', boxShadow: 3 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <img
                                        src={`/${doctorDetails?.image}`}
                                        alt={doctorDetails?.doctorName}
                                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" fontWeight="600">{doctorDetails?.doctorName}</Typography>
                                    <Typography variant="body1" color="textSecondary" fontWeight="500">{doctorDetails?.specialty}</Typography>
                                    <Typography variant="body2" color="textSecondary"><strong>Clinic:</strong> {doctorDetails?.clinicName}</Typography>
                                    <Typography variant="body2" color="textSecondary"><strong>Location:</strong> {doctorDetails?.location}</Typography>
                                    <Typography variant="body2" color="textSecondary"><strong>Contact:</strong> {doctorDetails?.contact.phone}</Typography>
                                </Grid>
                            </Grid>

                            <Box mt={4} sx={{ borderTop: '2px solid #ddd', paddingTop: '16px' }}>
                                <Typography variant="h6" fontWeight="600" color="primary">Selected Appointment:</Typography>
                                <Typography variant="body1">Day: {selectedDay}</Typography>
                                <Typography variant="body1">Time: {selectedTime}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
            {/* Modal */}
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h5" textAlign="center" fontWeight="600">
                            Thank You for Booking!
                        </Typography>
                        <Typography textAlign="center" sx={{ mt: 2 }}>
                            Your appointment has been successfully booked.
                        </Typography>
                        <Button
                            onClick={handleModalClose}
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, textTransform: 'none', fontWeight: '600' }}
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Checkout;
