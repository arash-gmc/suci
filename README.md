EchoFeed
A social media web app for everybody.

to start the app after clone the code: 
run npm i for download packages
install sql on your server
define these variables in .env file in root:
DATABASE_URL
CLOUDINARY_PRESET
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
then run npx prisma migrate dev to migrate the database
after that run npm run dev
