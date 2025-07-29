import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Basic frontend validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !date ||
      !time ||
      guests === "" ||
      isNaN(guests)
    ) {
      toast.error("Please fill all fields correctly.");
      setLoading(false);
      return;
    }

    // ✅ Log payload for debugging
    console.log("Sending reservation data:", {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      time,
      guests: Number(guests)
    });

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          date,
          time,
          guests: Number(guests)
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      toast.success(data.message);

      // ✅ Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("");

      navigate("/success");
    } catch (error) {
      console.error("Reservation error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="Reservation Banner" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Number of Guests"
                  min="1"
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Reserving..." : "RESERVE NOW"}{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;