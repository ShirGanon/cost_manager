// Fetch team members with schema mapping
async function getAbout(req, res, next) {
  try {
    // Static team member list
    const team = [
      { first_name: 'Aviv', last_name: 'Grinberg' },
      { first_name: 'Shir', last_name: 'Ganon' }
    ];

    res.json(team);
  } catch (err) {
    next(err);
  }
}

// Export getAbout controller
module.exports = {
  getAbout
};
