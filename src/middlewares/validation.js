const validation = (schema) => async (req, res, next) => {
  try {
    const validatedBody = await schema.validate(req.body)
    req.body = validatedBody
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'false',
      message: error.message,
    })
  }
}

module.exports = validation