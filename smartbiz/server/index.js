const express = require("express");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = 3001;
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/shop', express.static(path.join(__dirname, 'shop')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// ── Database ───────────────────────────────────────────
console.log("Connecting to DB:", process.env.MONGO_URI || "mongodb://localhost:27017/stores");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/stores", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ── Multer (for future image uploads) ──────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'media'));  // save to server/media
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Storage for shop images
const shopStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'shop'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadShop = multer({ storage: shopStorage });

// Storage for product images (already exists)-----------------------------------
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'media'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadProduct = multer({ storage: productStorage });
// Storage for profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'profile'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadProfile = multer({ storage: profileStorage });

// Storage for feedback images (uploaded by users)
const feedbackStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Save to /uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadFeedback = multer({ storage: feedbackStorage });


// ── Schemas ────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  address: String, 
  profileImg: { type: String, default: "" },
  products: [{
    shopId: Number,
    productId: Number,
    quantity: Number,
    total: Number,
    billNo: Number,
    date: String
  }],
  shops: [Number]
});

const shopSchema = new mongoose.Schema({
  ownerEmail: String,
  owner: String,
  contactNumber: String,
  shopAddress: String,
  shopId: Number,
  name: String,
  subscription: String,
  img: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  shopId: Number,
  id: Number,
  name: String,
  price: Number,
  imgUrl: String
});
const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  imageUrl: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);




const User = mongoose.model("User", userSchema);
const Shop = mongoose.model("Shop", shopSchema);
const Product = mongoose.model("Product", productSchema);

// ── Middleware ────────────────────────────────────────
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Mail ───────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password"
  },
  tls: { rejectUnauthorized: false }
});

// ── Signup ─────────────────────────────────────────────
app.post("/signupform", async (req, res) => {
  const { fullname, email, password, pass, address } = req.body;

  if (!fullname || !email || !password || !pass || !address)
    return res.status(400).json({ success: false, message: "All fields are required" });

  if (password !== pass)
    return res.status(400).json({ success: false, message: "Passwords do not match" });

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ success: false, message: "Email already registered" });

  const user = new User({
    fullname,
    email,
    password,
    address,        // ✅ added this line
    products: [],
    shops: []
  });

  await user.save();

  res.cookie("fullname", fullname, { maxAge: 604800000 });
  res.cookie("email", email, { maxAge: 604800000 });

  transporter.sendMail({
    from: process.env.EMAIL_USER || "your-email@gmail.com",
    to: email,
    subject: "Signup Successful",
    text: `Hi ${fullname},\n\nThank you for signing up!`
  });

  res.status(200).json({ success: true });
});


// ── Login ──────────────────────────────────────────────
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  const user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(401).json({ message: "Invalid login" });

  res.cookie("fullname", user.fullname, { maxAge: 604800000 });
  res.cookie("email", user.email, { maxAge: 604800000 });

  const existingShops = await Shop.find({ ownerEmail: email });
  if (existingShops.length > 0)
    res.cookie("shopCreated", "true", { maxAge: 604800000 });

  transporter.sendMail({
    from: process.env.EMAIL_USER || "your-email@gmail.com",
    to: email,
    subject: "Login Successful",
    text: `Hi ${user.fullname}, you're logged in.`
  });

  res.json({ success: true });
});

// ── Create Shop ────────────────────────────────────────
app.post("/createshop", uploadShop.single("img"), async (req, res) => {
  try {
    const { name, owner, contactNumber, shopAddress, email } = req.body;
    const subscription = req.body.subscription || req.body.plan || "basic";
    const userEmail = req.cookies.email || email;
    if (!userEmail) return res.status(401).json({ message: "Login required" });

    const user = await User.findOne({ email: userEmail });
    const existingShops = await Shop.find({ ownerEmail: userEmail });
    if (existingShops.length >= 4 && subscription !== "premium")
      return res.status(403).json({ message: "Basic plan allows max 4 shops" });

    const lastShop = await Shop.findOne().sort({ shopId: -1 }).exec();
    const shopId = lastShop ? lastShop.shopId + 1 : 1000;

    // File path
    const imgPath = req.file ? `shop/${req.file.filename}` : "";

    const newShop = new Shop({
      ownerEmail: userEmail,
      owner,
      contactNumber,
      shopAddress,
      shopId,
      name,
      subscription,
      img: imgPath
    });

    await newShop.save();
    user.shops.push(shopId);
    await user.save();
    res.cookie("shopCreated", "true", { maxAge: 604800000 });

    transporter.sendMail({
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: userEmail,
      subject: "Shop Created",
      text: `Your shop "${name}" is created with ID: ${shopId}`
    });

    res.json({ success: true, shopId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
//-upload profile image-------------------------------------
app.post("/upload-profile-img", uploadProfile.single("image"), async (req, res) => {
  try {
    const { email } = req.cookies;
    const { address } = req.body;

    if (!email) {
      return res.status(401).json({ success: false, message: "Login required" });
    }

    const updateData = {};

    if (req.file) {
      const imagePath = `profile/${req.file.filename}`;
      updateData.profileImg = imagePath;
    }

    if (address) {
      updateData.address = address;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      profileImg: updatedUser.profileImg ? `http://localhost:3001/${updatedUser.profileImg}` : null,
      address: updatedUser.address || ''
    });
  } catch (error) {
    console.error("Profile image upload error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/getuser/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



// ── Upload Product Image ───────────────────────────────
app.post("/upload-product-img", uploadProduct.single("image"), async (req, res) => {
  try {
    const { shopId, name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image required" });
    }

    const shopIdNum = Number(shopId);

    // Find the product with the highest id for THIS shop
    const lastProduct = await Product.findOne({ shopId: shopIdNum })
      .sort({ id: -1 }) // descending by id
      .exec();

    // Generate next product id (start from 101 if no products exist for this shop)
    const newProductId = lastProduct ? lastProduct.id + 1 : 101;

    const imagePath = `media/${req.file.filename}`;

    const product = new Product({
      shopId: shopIdNum,
      id: newProductId,
      name,
      price: Number(price),
      imgUrl: imagePath,
    });

    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product: {
        shopId: shopIdNum,
        id: newProductId,
        name,
        price: Number(price),
        imgUrl: imagePath,
      },
    });
  } catch (err) {
    console.error("Upload product error:", err);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
});



// ── Serve Product Image ────────────────────────────────
app.get("/product-img/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.img) {
      return res.status(404).send("Image not found");
    }
    res.set("Content-Type", product.imgType);
    res.send(product.img);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
// ── Inventory ──────────────────────────────────────────
app.get("/inventory", async (req, res) => {
  try {
    const shops = await Shop.find({});
    const products = await Product.find({});

    const productsByShop = {};
    for (const p of products) {
      if (!productsByShop[p.shopId]) productsByShop[p.shopId] = [];
    // Remove leading "media/" if present
let cleanImg = p.imgUrl || "";
if (cleanImg.startsWith("media/")) {
  cleanImg = cleanImg.replace(/^media\//, "");
}

productsByShop[p.shopId].push({
  id: p.id,
  name: p.name,
  price: p.price,
  imgUrl: cleanImg
});

    }

    const shopOwners = shops.map(s => {
  let imgPath = s.img;
  if (imgPath && imgPath.startsWith("shop/")) {
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    imgPath = `${baseUrl}/${imgPath}`;
  }
  return {
    id: s.shopId,
    name: s.name,
    email: s.ownerEmail,
    img: imgPath
  };
});


    res.json({ shopOwners, productsByShop });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching inventory" });
  }
});

// ── Purchase (online / cash) ───────────────────────────
app.post("/purchase", async (req, res) => {
  const { email } = req.cookies;
  const { method } = req.query;
  if (!email)
    return res.status(401).json({ success: false, message: "Login required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const cart = Array.isArray(req.body) ? req.body : [req.body];

  // Consolidate bill
  const billNo = Date.now();
  let total = 0;
  const purchasedProducts = [];
  let shopIdRef = null;

  for (const item of cart) {
    const product = await Product.findOne({ shopId: item.shopId, id: item.productId });
    const shop = await Shop.findOne({ shopId: item.shopId });
    if (!product || !shop)
      return res.status(400).json({ success: false, message: "Invalid product or shop" });

    shopIdRef = item.shopId;

    const amount = product.price * item.quantity;
    total += amount;

    purchasedProducts.push({
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: amount
    });

    const userBill = {
      shopId: item.shopId,
      productId: item.productId,
      quantity: item.quantity,
      total: +(amount * 1.18).toFixed(2),
      billNo,
      date: new Date().toISOString()
    };
    user.products.push(userBill);
  }

  await user.save();

  const gst = total * 0.18;
  const grandTotal = +(total + gst + 50).toFixed(2);

  // If Cash on Delivery
  if (method === "cash") {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", chunk => buffers.push(chunk));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      // Delivery date estimation logic
const deliveryDaysOptions = [5, 7, 8, 9];
const randomIndex = Math.floor(Math.random() * deliveryDaysOptions.length);
const selectedDays = deliveryDaysOptions[randomIndex];

const estimatedDeliveryDate = new Date();
estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + selectedDays);

const formattedDeliveryDate = estimatedDeliveryDate.toDateString(); 

      transporter.sendMail({
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "Order Receipt",
       text: `Thank you for your purchase! 🎉\n\nYour invoice is attached as a PDF.\n\nEstimated delivery date for your products is: ${formattedDeliveryDate}\n\nWe hope you enjoy your purchase!`,
        attachments: [{ filename: `bill-${billNo}.pdf`, content: pdfData }]
      });
      res.json({
        success: true,
        purchases: { billNo, products: purchasedProducts, total: grandTotal }
      });
    });

    const shop = await Shop.findOne({ shopId: shopIdRef });

    // SAME FORMAT, but print all products:
    doc.fontSize(20).text("Smartbiz Hub", { align: "center" });
    doc.fontSize(14).text("Order Receipt", { align: "center" });
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Bill No:       ${billNo}`);
    doc.text(`Customer:      ${email}`);
    doc.text(`Shop Name:     ${shop.name}`);
    doc.text(`Date:          ${new Date().toLocaleString()}`);
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
    doc.fontSize(13).text("Product Details", { underline: true });
    doc.moveDown(0.5);

   // Table columns
const colX = { product: 60, qty: 240, price: 320, total: 420 };

const y = doc.y;
doc.font("Helvetica-Bold");
doc.text("Product", colX.product, y);
doc.text("Qty", colX.qty, y);
doc.text("Price", colX.price, y);
doc.text("Total", colX.total, y);
doc.font("Helvetica");


// Dotted line under header
let lineY = doc.y + 2;
doc.moveTo(50, lineY)
   .lineTo(550, lineY)
   .dash(2, { space: 2 })
   .stroke()
   .undash();

for (const p of purchasedProducts) {
  doc.moveDown(0.5);
  let rowY = doc.y;
  doc.text(p.name, colX.product, rowY);
  doc.text(String(p.quantity), colX.qty, rowY);
  doc.text(`Rs.${p.price.toFixed(2)}`, colX.price, rowY);
  doc.text(`Rs.${p.subtotal.toFixed(2)}`, colX.total, rowY);

  // dotted line
  let currentY = doc.y + 2;
  doc.moveTo(50, currentY)
     .lineTo(550, currentY)
     .dash(2, { space: 2 })
     .stroke()
     .undash();
}

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
   // Print totals
doc.moveDown(1.5);

const pageWidth = doc.page.width;
const margin = 50;
const textWidth = pageWidth - margin * 2;

// Print subtotal (no wrapping)
doc.font("Helvetica-Bold")
   .text(`Subtotal (without GST): Rs.${total.toFixed(2)}`,
         margin, doc.y,
         { width: textWidth, align: "right", continued: false });

// Print grand total (no wrapping)
doc.font("Helvetica-Bold")
   .text(`Grand Total (18% GST): Rs.${grandTotal} \n \n(Delivery Charges Rs.50 included)`,
         margin, doc.y,
         { width: textWidth, align: "right", continued: false });


    doc.moveDown();
    doc.fontSize(10).font("Helvetica-Oblique").text("Thank you for your purchase!", { align: "center" });
    doc.end();
    return;
  }

  // If Online payment: return QR with integrated bill
  if (method === "online") {
    const shop = await Shop.findOne({ shopId: shopIdRef });
    const qrText = `upi://pay?pa=owner@upi&pn=${shop.name}&am=${grandTotal}&cu=INR`;
    const qrImage = await QRCode.toDataURL(qrText);

    return res.json({
      success: true,
      purchases: { billNo, products: purchasedProducts, total: grandTotal },
      qrImage
    });
  }

  // Default fallback
  res.json({
    success: true,
    purchases: { billNo, products: purchasedProducts, total: grandTotal }
  });
});

// ── My Purchases (existing) ────────────────────────────
app.get("/mypurchases", async (req, res) => {
  const { email } = req.cookies;
  if (!email)
    return res.status(401).json({ success: false, message: "Login required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.json({ success: true, purchases: user.products });
});

// ── NEW: Purchase History for Profile Page ─────────────
app.get("/user-purchase-history", async (req, res) => {
  const { email } = req.cookies;
  if (!email)
    return res.status(401).json({ success: false, message: "Not logged in" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, purchases: user.products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── Logout ─────────────────────────────────────────────
app.get("/logout", (req, res) => {
  res.clearCookie("fullname");
  res.clearCookie("email");
  res.clearCookie("shopCreated");
  res.send("<h2>Logged out</h2><a href='/'>Back to Home</a>");
});

// ── Email ─────────────────────────────────────────
app.get("/getshopbyemail/:email", async (req, res) => {
  try {
    const shop = await Shop.findOne({ ownerEmail: req.params.email });
    if (!shop) return res.json({ success: false, message: "Shop not found" });
    res.json({ success: true, shop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// ── Delete Product ─────────────────────────────────────
app.delete("/delete-product/:shopId/:productId", async (req, res) => {
  try {
    const { email } = req.cookies;
    const { shopId, productId } = req.params;

    if (!email) {
      return res.status(401).json({ success: false, message: "Login required" });
    }

    // Check if the shop belongs to this user
    const shop = await Shop.findOne({ shopId: Number(shopId), ownerEmail: email });
    if (!shop) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Delete the product
    const deleted = await Product.deleteOne({ shopId: Number(shopId), id: Number(productId) });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// ── Update Product (edit) ─────────────────────────────────────
app.put("/edit-product/:shopId/:productId", uploadProduct.single("image"), async (req, res) => {
  try {
    const { email } = req.cookies;
    const { shopId, productId } = req.params;

    if (!email) return res.status(401).json({ success: false, message: "Login required" });

    // Check shop ownership
    const shop = await Shop.findOne({ shopId: Number(shopId), ownerEmail: email });
    if (!shop) return res.status(403).json({ success: false, message: "Not authorized" });

    // Prepare update object
    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.price) updateFields.price = Number(req.body.price);
    if (req.file) {
      updateFields.imgUrl = `media/${req.file.filename}`;
    }

    const updated = await Product.findOneAndUpdate(
      { shopId: Number(shopId), id: Number(productId) },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/// Utility to generate a random appointment date 2 days ahead
// Function to get random appointment date by adding random days from array
function getRandomAppointmentDate() {
  const daysToAddOptions = [3, 5, 7, 8, 4];
  const randomIndex = Math.floor(Math.random() * daysToAddOptions.length);
  const daysToAdd = daysToAddOptions[randomIndex];

  const now = new Date();
  now.setDate(now.getDate() + daysToAdd); // Add random days from array

  const hour = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
  const minute = Math.floor(Math.random() * 60);
  now.setHours(hour, minute, 0, 0);

  return now;
}
// Array of 7 Gujarat branch addresses
const branchAddresses = [
  "SmartBiz Hub Branch 1, SG Highway, Ahmedabad, Gujarat",
  "SmartBiz Hub Branch 2, Ring Road, Surat, Gujarat",
  "SmartBiz Hub Branch 3, Sayajigunj, Vadodara, Gujarat",
  "SmartBiz Hub Branch 4, Kalawad Road, Rajkot, Gujarat",
  "SmartBiz Hub Branch 5, Mandvi Road, Bhuj, Gujarat",
  "SmartBiz Hub Branch 6, Station Road, Junagadh, Gujarat",
  "SmartBiz Hub Branch 7, Palitana Road, Bhavnagar, Gujarat"
];

function getRandomBranch() {
  const index = Math.floor(Math.random() * branchAddresses.length);
  return branchAddresses[index];
}

// Offline appointment booking endpoint
app.post("/offline-appointment", async (req, res) => {
  try {
    const email = req.cookies?.email;
    if (!email) {
      return res.status(401).json({ success: false, message: "Login required" });
    }

    const appointmentDate = getRandomAppointmentDate();
    const formattedDate = appointmentDate.toLocaleDateString();
    const formattedTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const branch = getRandomBranch();

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: email,
      subject: "Offline Appointment Confirmation",
      text: `Your offline appointment is confirmed on ${formattedDate} at ${formattedTime}.
Please meet us at our Gujarat branch:
${branch}`
    });

    res.json({
      success: true,
      message: `Offline appointment booked. Details sent to ${email}.`,
      date: formattedDate,
      time: formattedTime,
      branch: branch
    });
  } catch (error) {
    console.error("Error booking offline appointment:", error);
    res.status(500).json({ success: false, message: "Failed to book appointment" });
  }



  
});
app.post("/submit-feedback", uploadFeedback.single("image"), async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ success: false, message: "Name and message are required" });
    }

    const imageUrl = req.file ? `uploads/${req.file.filename}` : "";

    const newFeedback = new Feedback({
      name,
      message,
      imageUrl
    });

    await newFeedback.save();

    res.json({ success: true, message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/get-feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch feedbacks" });
  }
});






// ── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

