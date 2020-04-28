
exports.seed = async function(knex) {
      await knex('health_data').insert([
        {
          coach_id: '11e30af8-b531-49b2-9387-2647dc76444a',
          client_id: '0d560384-5bce-46c9-94fb-5c5e8209f6dd',
          systolic_bp: 130,
          diastolic_bp: 70,
          weight: 160
        },
        {
          coach_id: '11e30af8-b531-49b2-9387-2647dc76444a',
          client_id: '0d560384-5bce-46c9-94fb-5c5e8209f6dd',
          systolic_bp: 130,
          diastolic_bp: 70,
          weight: 160
        },
      ]);
};

