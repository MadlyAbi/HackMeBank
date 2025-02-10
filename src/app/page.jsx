"use client";
import React, { useState, useCallback, useEffect } from "react";


function MainComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("10000.00");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, content: "Welcome to SecureBank! (Not really secure)" },
    { id: 2, content: "Special offer: Get 10% cashback!" },
    {
      id: 3,
      content: "<!-- Debug: admin password reset token: 0xdeadbeef -->",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [apiKey] = useState("sk_test_51ABCxyz");
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.includes("'") || username.includes('"')) {
      setError("Invalid characters detected");
      return;
    }
    if (
      (username === "admin" && password === "password123") ||
      (username === "test" && password === "test123")
    ) {
      setLoggedIn(true);
      logActivity("login_success", { username });
      setError("");
    } else {
      logActivity("login_failure", { username, password });
      setError(
        "Invalid credentials. Hint: Try admin/password123 or test/test123"
      );
    }
  };
  const handleTransfer = (e) => {
    e.preventDefault();
    if (!transferAmount || !transferTo) {
      setError("Please fill in all fields");
      return;
    }
    const query = `SELECT * FROM transactions WHERE to_account = '${transferTo}'`;
    console.log("Debug - SQL Query:", query);
    const newBalance = parseFloat(balance) - parseFloat(transferAmount);
    setBalance(newBalance.toFixed(2));
    logActivity("transfer", { amount: transferAmount, recipient: transferTo });
    setError(`Transfer of ${transferAmount} to ${transferTo} completed`);
  };
  const handleMessage = (e) => {
    e.preventDefault();
    const messageContent = newMessage;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        content: messageContent,
        user: username,
        timestamp: new Date().toISOString(),
      },
    ]);
    logActivity("post_message", { content: messageContent });
    setNewMessage("");
  };

  const logActivity = useCallback(
    (action, data) => {
      const timestamp = new Date().toISOString();
      const userAgent =
        typeof window !== "undefined" ? window.navigator.userAgent : "";
      const logEntry = {
        timestamp,
        action,
        data,
        userAgent,
        sessionId: btoa(username + timestamp),
      };
      console.log("Security Log:", logEntry);
    },
    [username]
  );

  useEffect(() => {
    if (loggedIn) {
      const token = btoa(
        JSON.stringify({ username, role: "user", exp: Date.now() + 3600000 })
      );
      if (typeof window !== "undefined") {
        window.localStorage.setItem("auth_token", token);
      }
    }
  }, [loggedIn, username]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h1 className="text-2xl font-bold mb-8 text-center text-blue-600">
                    SecureBank Login
                  </h1>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                      Login
                    </button>
                  </form>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">
              Welcome, {username}
            </h1>
            <button
              onClick={() => setLoggedIn(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
            <p className="text-3xl font-bold text-green-600">${balance}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Transfer Money</h2>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="transferTo"
                  placeholder="Recipient Account"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                Transfer
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Messages Board</h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 bg-gray-50 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              ))}
              <form onSubmit={handleMessage} className="space-y-4">
                <input
                  type="text"
                  placeholder="Write a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                  Post Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;