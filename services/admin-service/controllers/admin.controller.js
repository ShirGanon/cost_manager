/**
 * Returns developers team members.
 * Requirement: properties must match users collection names (first_name, last_name).
 * Do NOT include any additional data.
 */
async function getAbout(req, res, next) {
  try {
    const team = [
      { first_name: 'Aviv', last_name: 'Grinberg' },
      { first_name: 'Shir', last_name: 'Ganon' }
    ];

    res.json(team);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAbout
};
