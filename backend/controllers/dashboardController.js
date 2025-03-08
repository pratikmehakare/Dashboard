const Table = require("../models/Table");

exports.getTables = async (req, res) => {
  try {
    const tableConfig = await Table.findOne({ user: req.userId });
    if (!tableConfig) {
      return res.status(404).json({ error: 'Table configuration not found' });
    }
    res.json({ tableConfig });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch table configuration' });
  }
};


exports.createTable = async (req, res) => {
  const { columns } = req.body; // e.g., [{ name: 'Name', type: 'text' }, { name: 'Date', type: 'date' }]
  if (!columns) {
    return res.status(400).json({
      success: false,
      message: "fill all details",
    });
  }
  try {
    const tableConfig = new Table({ user: req.userId, columns });
    await tableConfig.save();
    res.json({ message: "Table created successfully", tableConfig });
  } catch (error) {
    res.status(500).json({ error: "Failed to create table" });
  }
};

exports.addColumn = async (req, res) => {
  const { tableId, column } = req.body; // column: { name, type }

  if (!column || !tableId) {
    return res.status(400).json({
      success: false,
      message: "fill all details",
    });
  }

  try {
    const tableConfig = await Table.findOne({ _id: tableId, user: req.userId });
    if (!tableConfig) 
      return res.status(404).json({ 
             error: "Table not found" 
            });

    tableConfig.columns.push(column);
    await tableConfig.save();
    res.json({ message: "Column added", tableConfig });
  } catch (error) {
    console.error("Error adding column:", error);
    res.status(500).json({ error: "Failed to add column" });
  }
};
