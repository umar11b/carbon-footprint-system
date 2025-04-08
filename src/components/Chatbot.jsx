import React from "react";

const Chatbot = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ecoLight px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 border border-ecoGreen">
        <h2 className="text-3xl font-bold text-ecoDark text-center mb-2">
          🤖 Sustainability Chatbot
        </h2>
        <p className="text-center text-ecoBrown mb-6">
          Your eco-assistant for going green 🌱
        </p>

        <div className="bg-gray-100 rounded-lg p-4 space-y-3 h-56 overflow-y-auto border border-ecoSky">
          <div className="flex flex-col space-y-2">
            <div className="self-end bg-ecoGreen text-white p-3 rounded-xl max-w-xs">
              <strong>User:</strong> How can I reduce my carbon footprint?
            </div>
            <div className="self-start bg-white border border-ecoDark text-ecoDark p-3 rounded-xl max-w-xs">
              <strong>Bot:</strong> Try using energy-efficient appliances and
              reduce car use!
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-ecoGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-ecoDark"
          />
          <button className="px-5 py-3 bg-ecoDark hover:bg-ecoGreen text-white font-semibold rounded-lg transition duration-300">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
