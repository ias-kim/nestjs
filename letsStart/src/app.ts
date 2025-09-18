import * as express from "express";
const app: express.Express = express();
const port: number = 9000;

app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
