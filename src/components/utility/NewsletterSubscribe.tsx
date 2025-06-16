import { useState } from "react";
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const NewsletterSubscribe = () => {

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Replace this with your actual API endpoint
      const apiUrl = `${API_URL}subscribe`;

      const response = await axios.get(apiUrl, {
        params: { email },
      });

      if (response.status === 200) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Subscription failed. Please try again later.");
    }
  };

  return (
    <Box
      className="newsletter-box"
      sx={{

        color: "white",
        maxWidth: 500,

      }}
    >
      <Typography variant="h5" className="text-white stay-uptodate" gutterBottom>
        Stay up to date with us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {status && (
            <Alert severity={status} sx={{ mt: 1 }}>
              {message}
            </Alert>
          )}
          <div className="sub-div">
            
            <TextField
              fullWidth
              type="email"
              label="Enter your email address"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#fff",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#000", // Optional: dark label on white bg
                  "&.Mui-focused": {
                    color: "#000",
                  },
                },
              }}
            />

            <Button
              className="abs-btn-i"
              type="submit"
              variant="outlined"
              endIcon={<SendIcon />}
              sx={{ color: "white", borderColor: "white" }}
            >
              Subscribe
            </Button>
          </div>
          <Typography variant="body2" sx={{ color: "#ccc" }} className="by-submit">
            By submitting the form, you agree to our{" "}
            <NavLink
              to="/article/terms-conditions"
              style={{
                color: '#fff',
                textDecoration: 'none',
                borderBottom: '1px solid #fff'
              }}
            >
              Terms & Conditions
            </NavLink>{" "}
            and{" "}
            <NavLink
              to="/article/privacy-policy"
              style={{
                color: '#fff',
                textDecoration: 'none',
                borderBottom: '1px solid #fff'
              }}
            >
              Privacy Policy
            </NavLink>

            .
          </Typography>

        </Stack>
      </form>
    </Box>
  );
};

export default NewsletterSubscribe;
