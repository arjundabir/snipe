import mongoose from "mongoose";

export async function initMongo() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    session: String,
    location: {
        lat: Number,
        lng: Number
    },
    points: Number
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export async function addUser(name: string, session: string, lat:Number, lng: Number) {
    try {
        const newUser = new User({ name, session, location: { lat, lng }, points:0 });
        await newUser.save();
        console.log("User added successfully:", newUser);
    } catch (error) {
            try {
                // Update the user if the name already exists, regardless of session
                const updatedUser = await User.findOneAndUpdate(
                    { name }, // Only check for name to identify the user
                    { $set: { session: session, location: { lat, lng } } },
                    { new: true, upsert: true } // options: return the updated document and create if it doesn't exist
                );
                if (updatedUser) {
                    console.log("User session updated successfully:", updatedUser);
                } else {
                    console.log("User was not found or no updates were needed.");
                }
            } catch (updateError) {
                console.error("Error updating user session:", updateError);
            }
        } 
}

export async function findUser(name: string) {
    try {
        const user = await User.findOne({ name });
        if (user) {
            console.log("User found:", user);
            return user;
        } else {
            console.log("User not found.");
            return null;
        }
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
}


export async function updateLocation(name: string, lat:Number, lng: Number){
    try {
                // Update the location if the same user and session are found
                const updatedUser = await User.findOneAndUpdate(
                    { name }, // Match user and session
                    { $set: { 'location.lat': lat, 'location.lng': lng } }, // Update location fields
                    { new: true } // Return the updated document
                );
                console.log("User location updated successfully:", updatedUser);
                return updatedUser
            } catch (updateError) {
                console.error("Error updating user location:", updateError);
            }
}