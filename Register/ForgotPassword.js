import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function ForgotPassword() {
  const notify = () => toast.success('Mot de passe réinitialisé, merci de vérifier votre mail.', {
    duration: 4000,
  });

  const mailError = () => toast.error('Merci d\'entrer votre email.', {
    duration: 4000,
  });


  const [Email, setEmail] = useState("");



  const resetLink = (e) => {
    e.preventDefault();
    const data = { email: Email }

    if (data.email.length > 0) {
      axios
        .post(`${process.env.REACT_APP_API}/api/auth/forgot`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      notify()

    } else {
      mailError()
    }

  }







  return (
    <div className="forgot-password">
      <Toaster />
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Votre adresse email" />
      <button onClick={(e) => resetLink(e)} className="button-primary">Regénérer un mot de passe</button>
    </div>
  )
}

export default ForgotPassword
