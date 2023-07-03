import env from "react-dotenv";

async function getData(URL) {
    if (!URL) return 'No URL';

    const response = await fetch(URL);
    const jsonData = await response.json();
    return jsonData;

}
export default getData;
