const BASE_URL = "http://localhost:5000";

export const getRecommendations = async (data: any) => {
  const res = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};