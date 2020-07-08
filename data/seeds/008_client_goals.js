
exports.seed = async function (knex) {
  await knex("client_goals").insert([
    {
      coach_id: "a20e141b-0929-45dc-b296-e22b6907ca96", 
      client_id: '46b97b6f-f3bf-494a-a840-44d3393d376f',
      title: "Have Goal",
      description: "to have a goal to test",
      start_date: "July 7, 2020",
      completed: false,
    },
  ])
}

