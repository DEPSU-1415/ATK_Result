# Execution Guide For ATK Report System

Step 1: Use the command below to clone this repository.
```
git clone https://github.com/DEPSU-1415/ATK_Result.git
```
Step 2: Use the command below to setup the package.json to the most recent version.
```
npm i
```
Step 3: Create the .env file and in ATK_Result directory and copy the text below
```
DB_URI=mongodb+srv://your-user:your-password@your-cluster-url/?retryWrites=true&w=majority&appName=Cluster0
```
Step 4: Replace the connection string in .env file with your connection string. Here, where you can get connection string.

`Don't forget to replace <password> with you password from your database when it created.`

![image](https://github.com/DEPSU-1415/ATK_Result/assets/118809826/418548b4-84e2-4ba4-82e9-c86441b669e9)

Step 5: Open Docker Desktop and open the terminal, then use this command below.
```
docker-compose up --build
```
Step 6:Enter `localhost:4000` to access the website.

# How to use ATK Report System for Student

Step 1: Access the `localhost:4000`

Step 2: You can choose between Login or Sign up to the system that require for username and password.

Step 3: After login, you can able to upload the image, checkbox the result that negative or positive, and select date & time for the atk result, then submit it.

Step 4: After successfully submitted, the system will display the message box that you are already sent atk result and it will still on the same page that you can send another report.

# How to use ATK Report System for Admin

Step 1: After login to the website, you can access `localhost:4000/admin` to see all of the report record from the student.

Step 2: You can edit and delete each report.

Step 3: After you edit or delete the report, the system will display the appreciated message box.
