// // src/components/auth/login-form.tsx
// "use client";
// import { useState } from "react";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Implement auth later");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="border p-2 w-full"
//         type="email"
//       />
//       <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="border p-2 w-full"
//         type="password"
//       />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>

//     </form>
//   );
// }
