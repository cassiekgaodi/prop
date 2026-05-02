import { useState } from "react";

export default function ProposalGame() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [tries, setTries] = useState(0);
  const [selected, setSelected] = useState([]);
  const [noText, setNoText] = useState("No");
  const [hint, setHint] = useState("");
  const [message, setMessage] = useState("");

  const [noClicks, setNoClicks] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const goodTraits = [
    "Kind",
    "Funny",
    "Beautiful",
    "Loyal",
    "Smart",
    "Supportive",
    "Caring",
    "Amazing",
    "Perfect",
  ];

  const badTraits = ["Lazy", "Rude", "Selfish", "Mean", "Arrogant", "Boring"];

  const acceptedNames = [
    "sweetie",
    "maatla",
    "my love",
    "baby",
    "sweetheart"
  ];

  const toggleTrait = (trait) => {
    if (badTraits.includes(trait)) {
      const msgs = ["Nope 😤", "Absolutely not 😂", "Try again ❤️", "Denied 🚫"];
      setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    if (selected.includes(trait)) {
      setSelected(selected.filter((t) => t !== trait));
    } else {
      setSelected([...selected, trait]);
    }
  };

  const handleNameSubmit = () => {
    const normalized = name.toLowerCase().trim();

    if (acceptedNames.includes(normalized)) {
      setStep(2);
      return;
    }

    const newTries = tries + 1;
    setTries(newTries);

    if (newTries === 1) setHint("Not quite... ❤️");
    else if (newTries === 2) setHint("Think of how I call you 🥺");
    else setHint("You're teasing me now 😭❤️");
  };

  const allGoodSelected = selected.length === goodTraits.length;

  const yesScale = 1 + noClicks * 0.15;
  const yesGlow = 20 + noClicks * 15;

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
    setNoText(noClicks === 0 ? "O sure kgarebe?" : "Please, tlhemma ke a go kopa!🥺");
  };

  const handleYes = () => {
    setShowFinal(true);
    setTimeout(() => setStep(4), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6] text-center p-6 relative overflow-hidden">

      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.05); }
          50% { transform: scale(1); }
          75% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .heartbeat { animation: heartbeat 1.5s infinite; }
      `}</style>

      {/* INTRO */}
      {step === 0 && (
        <div className="space-y-6">
          <h1 className="text-3xl font-light">Made with love by your Princess 💛</h1>
          <button className="px-6 py-3 bg-black text-white rounded-full" onClick={() => setStep(1)}>Start</button>
        </div>
      )}

      {/* NAME */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl">Enter your name</h2>
          <input
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {hint && <p className="text-sm italic">{hint}</p>}
          <button className="mt-3 px-4 py-2 bg-black text-white rounded" onClick={handleNameSubmit}>
            Continue
          </button>
        </div>
      )}

      {/* TRAITS */}
      {step === 2 && (
        <div className="space-y-4 max-w-md">
          <h2 className="text-lg">Here's Why You Should Say Yes. I am......</h2>

          {message && <p className="text-red-500 animate-pulse">{message}</p>}

          <div className="grid grid-cols-2 gap-2">
            {goodTraits.concat(badTraits).map((t) => {
              const isSelected = selected.includes(t);

              return (
                <button
                  key={t}
                  onClick={() => toggleTrait(t)}
                  className={`p-2 border rounded transition transform hover:scale-105 ${
                    isSelected ? "bg-green-300 border-green-600" : "bg-white"
                  }`}
                >
                  {t} {isSelected ? "✔" : ""}
                </button>
              );
            })}
          </div>

          {allGoodSelected && (
            <button
              className="mt-4 px-6 py-2 bg-black text-white rounded"
              onClick={() => setStep(3)}
            >Next</button>
          )}
        </div>
      )}

      {/* FINAL */}
      {step === 3 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md heartbeat">

          <h1 className="text-3xl font-bold text-white mb-10">
            Will you be my girlfriend? 💌
          </h1>

          <div className="flex gap-6 items-end">
            <button
              onClick={handleYes}
              style={{
                transform: `scale(${yesScale})`,
                boxShadow: `0 0 ${yesGlow}px rgba(0,255,100,0.8)`
              }}
              className="px-8 py-4 bg-green-500 text-white rounded-full text-xl"
            >YES</button>

            <button
              onClick={handleNoClick}
              style={{ transform: "scale(0.7)" }}
              className="px-6 py-3 bg-red-500 text-white rounded-full opacity-80"
            >{noText}</button>
          </div>
        </div>
      )}

      {/* LOVE */}
      {step === 4 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-pink-100">
          {showFinal && <div className="absolute inset-0 text-5xl">🎉💖🎉💖🎉</div>}

          <h1 className="text-5xl font-bold z-10">I love you ❤️</h1>
          <p className="text-xl z-10 mt-4">You said yes… I knew you would 🥺</p>

          
        </div>
      )}
    </div>
  );
}
