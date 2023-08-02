const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("hello_world_db", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
});

// Connect Database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// model definition for table "books"
const Book = sequelize.define("books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
  },
});

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Book table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// Create table
sequelize
  .sync()
  .then(() => {
    console.log("Book table created successfully!");

    // Create data (records)
    Book.create({
      title: "Clean Code12",
      author: "Robert Cecil Martin",
      release_date: "2021-12-14",
      subject: 3,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to create a new record : ", error);
      });

    //Find data
    Book.findOne({
      where: {
        id: "1",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });

    // Deleta data
    Book.destroy({
      where: {
        id: 3,
      },
    })
      .then(() => {
        console.log("Successfully deleted record.");
      })
      .catch((error) => {
        console.error("Failed to delete record : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

// Use Typescript

// import { Sequelize, DataTypes, Model } from "sequelize";

// const sequelize = new Sequelize("hello_world_db", "root", "123456789", {
//   host: "localhost",
//   dialect: "mysql",
// });

// // Định nghĩa mô hình cho bảng "Book"
// class Book extends Model {
//   public title!: string;
//   public author!: string;
//   public release_date!: string;
//   public subject!: number;
// }

// Book.init(
//   {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     author: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     release_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     subject: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Book",
//   }
// );

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");

//     // Thêm một bản ghi mới vào bảng "Book"
//     const newBook = await Book.create({
//       title: "Clean Code",
//       author: "Robert Cecil Martin",
//       release_date: "2021-12-14",
//       subject: 3,
//     });

//     console.log("New record created successfully:", newBook.toJSON());
//   } catch (error) {
//     console.error("Unable to connect to the database: ", error);
//   }
// })();
