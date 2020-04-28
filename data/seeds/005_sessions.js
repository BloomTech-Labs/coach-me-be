
exports.seed = async function(knex) {
      await knex('sessions').insert([
        {
          session_date: "May 8, 2021",
          notes: "Keep it up! Health is looking good",
          coach_id: "659918be-887a-4ce7-a5c7-29434aeb1cb7",
          client_id: "46b97b6f-f3bf-494a-a840-44d3393d376f",

        },
        {
          session_date: "May 16, 2021",
          notes: "Keep it up! Health is looking good",
          coach_id: "659918be-887a-4ce7-a5c7-29434aeb1cb7",
          client_id: "0d560384-5bce-46c9-94fb-5c5e8209f6dd",

        },
      ]);
};
