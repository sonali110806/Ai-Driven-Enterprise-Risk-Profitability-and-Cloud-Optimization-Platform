app.post("/savePortalResult", async (req, res) => {
  try {
    const result = new PortalResult(req.body);
    await result.save();

    res.json({
      message: "Portal result saved successfully",
      data: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving portal result"
    });
  }
});
