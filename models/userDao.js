const { query } = require('express');
const dataSource = require('./dataSource');

const createUser = async function (
  typeId,
  name,
  email,
  hashedPassword,
  account
) {
  try {
    const result = await dataSource.query(
      `INSERT INTO 
              users(
              type_id,
              name,
              email,
              password,
              account
              ) VALUES (?, ?, ?, ?, ?);
          `,
      [typeId, name, email, hashedPassword, account]
    );
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await dataSource.query(
      `SELECT 
       id,
       type_id,
       account,
       name,
       email, 
       password 
      FROM
       users 
      WHERE 
       email = ?
      `,
      [email]
    );

    return result;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;

    throw error;
  }
};

const getUserByAccount = async (account) => {
  try {
    const result = await dataSource.query(
      `SELECT 
      id,
      type_id,
      account,
      name,
      email, 
      password 
     FROM
      users 
     WHERE 
      account = ?
      `,
      [account]
    );

    return [result];
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;

    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const userId = await dataSource.query(
      `SELECT
      id
      FROM
      users
      WHERE
      id = ?
      `,
      [id]
    );
    return user;
  } catch (error) {
    console.error('INVALID_USER', error);
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByAccount,
  getUserById,
};
