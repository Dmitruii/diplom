import axios from "axios";
import xlsx from "node-xlsx";

export default (router) => {
  router.get("/:id", async (req, res) => {
    try {
      const tournaments = await axios.get(
        `http://diplom-production-04e4.up.railway.app/items/tournaments?filter[_and][0][admin_id][id][_eq]=${req.params.id}&fields[]=*.*`
      );
      const data = [
        ["Tournament ID", "Name", "Game", "Date", "Location", "Admin"],
        ...tournaments.data.data.map((tournament) => [
          tournament.id,
          tournament.name,
          tournament.games_id.name,
          new Date(tournament.date_created).toDateString(),
          tournament.location.title,
          `${
            tournament.admin_id.first_name && tournament.admin_id.first_name
          } ${tournament.admin_id.last_name && tournament.admin_id.last_name}`,
        ]),
      ];

      var buffer = xlsx.build([{ name: "tournaments", data: data }]);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=tournaments.xlsx"
      );

      res.send(buffer);
    } catch (e) {
      res.send(e);
    }
  });
};
