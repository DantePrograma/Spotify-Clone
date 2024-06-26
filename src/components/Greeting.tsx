export const Greeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return (
      <p className="text-4xl text-white font-semibold mb-5">Good morning!</p>
    );
  } else if (currentHour < 18) {
    return (
      <p className="text-4xl text-white font-semibold mb-5">Good afternoon!</p>
    );
  } else {
    return (
      <p className="text-4xl text-white font-semibold mb-5">Good evening!</p>
    );
  }
};
