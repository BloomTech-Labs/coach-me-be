exports.seed = async function (knex) {
    await knex('coach_client').insert([
    {
        coach_id: '11e30af8-b531-49b2-9387-2647dc76444a',
        client_id: '0d560384-5bce-46c9-94fb-5c5e8209f6dd'
    },
    {
        coach_id: '659918be-887a-4ce7-a5c7-29434aeb1cb7',
        client_id: '46b97b6f-f3bf-494a-a840-44d3393d376f'
    },
    {
        coach_id: '659918be-887a-4ce7-a5c7-29434aeb1cb7',
        client_id: '82ad6337-b099-4bd7-b0f7-6c0c316fe250'
    },
    ])
};

