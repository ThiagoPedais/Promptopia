import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user';


// interface CustomSession extends Session {
//     user: User & { id: string };
// }


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // store the user id from MongoDB to session

            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();

                // check if user already exists
                const userExists = await User.findOne({ email: profile?.email });

                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: profile?.image,
                    });
                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }