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
    name: {type:String, unique: true},
    session: String,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export async function addUser(name: string, session: string) {
    try {
        const newUser = new User({ name, session });
        await newUser.save();
        console.log("User added successfully:", newUser);
    } catch (error) {
        // Check if the error is due to a MongoDB duplicate key error (error code 11000)
            try {
                // Attempt to find by name and update the session if it's different
                const updatedUser = await User.findOneAndUpdate(
                    { name, session: { $ne: session } }, // find a user with the same name but a different session
                    { $set: { session: session } }, // update the session field
                    { new: true } // options: return the updated document
                );
                if (updatedUser) {
                    console.log("User session updated successfully:", updatedUser);
                } else {
                    console.log("No update needed, session is already up-to-date.");
                }
            } catch (updateError) {
                console.error("Error updating user session:", updateError);
            }

    }
}

