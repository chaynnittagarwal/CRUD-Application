# Database

This project backend is supported by MySQL database.

Run `npm install` in the terminal to install the node_modules and its dependencies.

## Step 1:

  Run the below SQL query in the SQL workbench. 

  CREATE SCHEMA `employee` ;

  CREATE TABLE `employee`.`employee_details` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,
    `Covid` VARCHAR(45) NOT NULL DEFAULT 'Negative',
    `Hospitalized` VARCHAR(45) NOT NULL DEFAULT '',
    `Status` VARCHAR(45) NOT NULL DEFAULT 'Active',
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE)
  AUTO_INCREMENT = 000;

  ## Step 2

  Insert the sample data using the below query syntax

  INSERT INTO `employee`.`employee_details`
  (`Name`,
  `Hospitalized`,
  `Covid`,
  `Status`)
  VALUES
  ("ABC","Admitted","Positive","Active"),
  ("DEF","Discharged","Negative","Active"),
  ("RFE","Discharged","Positive","Active"),
  ("PQR","Admitted","Positive","Inactive"),
  ("HYF","Admitted","Negative","Active");

  ## Step 3

  Update the /db.js file `User` and `Password`

  ## Step 4

  Run `npm start`. The app will automatically conenct with the dataase and load the endpoint at `http://localhost:3000/`.



