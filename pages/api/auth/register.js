import axios from "axios";
export default function handler(req, res) {
  console.log("req of loginuser", req.body);
  if (req.method === "POST") {
    axios
      .post("http://127.0.0.1:8081/register", req.body)
      .then((backend) => {
        console.log(backend.data, "看看express返回的");
        res.status(200).json(backend.data);
      })
      .catch((err) => {
        console.error("后端出现问题");
      });
  }
}
