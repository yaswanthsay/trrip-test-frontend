import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
firstName: "",
lastName: "",
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const response = await axios.post(
    "http://localhost:3000/register",
    formData
  );

  localStorage.setItem("token", response.data.token);

  alert("Registration Successful");

  navigate("/");
} catch (err) {
  alert(
    err.response?.data?.message ||
    "Registration Failed"
  );
}


};

return ( <div className="min-h-screen flex justify-center items-center bg-gray-100"> <form
     onSubmit={handleSubmit}
     className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
   > <h1 className="text-3xl font-bold text-center mb-6">
Register </h1>

```
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
      required
    />

    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-6"
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
    >
      Register
    </button>

    <p className="text-center mt-4">
      Already have an account?{" "}
      <Link
        to="/"
        className="text-blue-600 font-semibold"
      >
        Login
      </Link>
    </p>
  </form>
</div>


);
}

export default Register;
