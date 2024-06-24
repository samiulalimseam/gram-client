const mode = process.env.NODE_ENV;

let url = "http://localhost:5000";
if (mode === "production") {
  url = "https://gram-api-82e8318cb6aa.herokuapp.com";
}

export default url;
