import ky from "ky";

const app = document.getElementById('app') as HTMLDivElement;
app.innerHTML = `
  <h1>Hello World, Node!</h1>
  <p>
    This is the / (home) route.  
  </p>
`;

// This is an example of a function that fetches data from our API.
const fetch_time = async () => {
  const time_data = await ky("/api/time").json() as { time: string };
  app.innerHTML += `
    <p>
      The time from the <a href="/api/time">/api/time</a> route is: ${time_data.time}
    </p>
  `;
};

fetch_time();
