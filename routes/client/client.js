const router = require('express').Router();
const healthDataRouter = require('./client-health-data');
const clientDB = require('../../models/client-model');
const access = require('../../middleware/auth/globalPriv');
const fileHandler = require('../../models/files-model');
const { body, param, validationResult } = require('express-validator');
/* MIDDLEWARE */

router.use('/:id', require('../../middleware/pathValidator').checkID);
//router.use(access.protected);
// router.use('/:id', access.private);

/* Health Data Metrics */
router.use('/:id/data', healthDataRouter);

/* All Clients */
router.get('/', async (req, res, next) => {
	try {
		const id = req.userID
		const clients = await clientDB.getLonelyClients();
		if (!clients) res.status(404).json("No clients found.");
		res.json({ ...clients});
	} catch (error) {
		next(error);
	}
})



/* Client Information */
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.userID;
    const client = await clientDB.getUserById(id);
    if (!client) res.status(404).json('No client found with that ID.');
    res.json({ ...client, password: null });
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  /*access.userOnly,*/ async (req, res, next) => {
    try {
      res.json(await clientDB.updateClientData(req.params.id, req.body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', access.userOnly, async (req, res, next) => {
  try {
    await clientDB.deleteClient(req.params.id);
    req.session.destroy();
    return res
      .clearCookie('token')
      .json('Account deleted. Logged out successfully.');
  } catch (error) {
    next(error);
  }
});

/* Client-Coach Session Notes */
router.post("/:id/sessions", async (req, res, next) => {
	try {
		const clientSessions = await clientDB.addClientSession()

	} catch (error) {
		next(error);
	}
});

router.get('/:id/sessions', async (req, res, next) => {
  try {
    const clientSessions = await clientDB.getCoachingSessions(req.params.id);
    res.json(clientSessions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/sessions/:sessionID', async (req, res, next) => {
  try {
    const clientSession = await clientDB.getCoachingSession(
      req.params.sessionID,
      req.params.id
    );
    if (clientSession.length < 1)
      res
        .status(404)
        .json('No coaching session records found for that session ID.');
    res.json(clientSession);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:id/sessions/:coachID',
  [
    param('id').isUUID().withMessage('id must be a UUID'),
    param('coachID').isUUID().withMessage('sessionID'),
    body('notes').isString().withMessage('notes must be a string'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.length) {
        return res.status(400).json(errors.array());
      }
      const { id, coachID } = req.params;
      const { notes, date } = req.body;
      await clientDB.addCoachingSession({
        client_id: id,
        coach_id: coachID,
        notes,
        date: new Date(date),
      });

      return res.status(201).json({
        message: 'Session created',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;