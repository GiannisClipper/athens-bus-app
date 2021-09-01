import { useEffect, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

const connectDatabase = ( { databaseName } ) => {

    try {
        const db = openDatabase( databaseName );
        if ( ! db ) {
            throw 'Database connection failed.';
        }
        return { db };

    } catch( error ) {
        return { error };
    }
}

const setupDatabase = ( { databaseName } ) => {

    const { db, error } = connectDatabase( { databaseName } );

    const transaction = async ( { sql, args } ) => {

        return new Promise( ( resolve, reject ) => {
    
            db.transaction( tx => tx.executeSql( 
                sql, 
                args, 
                ( tx, result ) => { 
                    // the structure of the result:
                    // { "insertId": undefined, 
                    // "rows": { "item": [Function item], "length": 0, "raw": [Function raw] }, 
                    // "rowsAffected": 0 }

                    const data = [];
                    for ( let i = 0; i < result.rows.length; i++ ) {
                        data.push( result.rows.item( i ) );
                    }
                    const { insertId, rowsAffected } = result;

                    const newResult = { data, insertId, rowsAffected };
                    resolve( newResult );
                }, 
                ( tx, result ) => {
                    const error = tx.message;
                    reject( error );
                }
            ) );
    
        } )
        .then( result => ( { result } ) )
        .catch( error => ( { error } ) );
    }

    const createTable = async ( table, structure ) => {
        const sql = `CREATE TABLE IF NOT EXISTS ${ table } ( ${ structure } );`;
        const args = [];
        const { result, error } = await transaction( { sql, args } );
        return { result, error };
    }

    const dropTable = async table => {
        const sql = `DROP TABLE IF EXISTS ${ table };`;
        const args = [];
        const { result, error } = await transaction( { sql, args } );
        return { result, error };
    }

    const listTables = async () => {
        const sql = `SELECT name FROM sqlite_master WHERE type = 'table';`;
        const args = [];
        const { result, error } = await transaction( { sql, args } );
        return { result, error };
    }

    return ! error
        ? { db, transaction, createTable, dropTable, listTables }
        : { error: 'No database connection.' };
}

const setupStorage = async ( { tableName, transaction, createTable, dropTable } ) => {

    const _createTable = async () => await createTable( tableName, 'name VARCHAR UNIQUE, value TEXT' );
    const _dropTable = async () => await dropTable( tableName );
    const { error } = await _createTable();  // CREATE TABLE IF NOT EXISTS
    
    const setItem = async ( name, value ) => {
        const sql = `INSERT OR REPLACE INTO ${ tableName } VALUES ( ?, ? );`;
        const args = [ name, value ];
        const { result, error } = await transaction( { sql, args } );
        if ( error ) throw error;
        return result.rowsAffected > 0;
    }

    const getItem = async name => {
        const sql = `SELECT value FROM ${ tableName } WHERE name = ?;`;
        const args = [ name ];
        const { result, error } = await transaction( { sql, args } );
        if ( error ) throw error;
        result.data = result.data.map( row => row.value );
        return result.data.length > 0 ? result.data[ 0 ] : undefined;
    }

    const getItems = async () => {
        const sql = `SELECT * FROM ${ tableName };`;
        const args = [];
        const { result, error } = await transaction( { sql, args } );
        if ( error ) throw error;
        result.data = result.data.map( row => ( { [ row.name ]: row.value } ) );
        return result.data;
    }

    const removeItem = async name => {
        const sql = `DELETE FROM ${ tableName } WHERE name = ?;`;
        const args = [ name ];
        const { result, error } = await transaction( { sql, args } );
        if ( error ) throw error;
        return result.rowsAffected > 0;
    }

    const clear = async () => {
        const dropResult = await _dropTable();
        if ( dropResult.error ) throw dropResult.error;

        const createResult = await _createTable();
        if ( createResult.error ) throw createResult.error;

        return true;
    }

    return ! error 
        ? { setItem, getItem, getItems, removeItem, clear }
        : { error };
}

const useStorage = props => {

    let { databaseName, tableName } = props || {};

    databaseName = databaseName ? databaseName : 'storage.db';
    tableName = tableName ? tableName : 'items';

    const [ state, setState ] = useState( {} );
 
    useEffect( async () => {
        // console.log( `Setup database ( ${ databaseName } )` );
        const database = setupDatabase( { databaseName } );

        if ( database.error ) {
            setState( { error: database.error } );
            return;
        }

        // console.log( `Setup storage ( ${ tableName } )` );
        const { transaction, createTable, dropTable } = database;
        const storage = await setupStorage( { tableName, transaction, createTable, dropTable } );

        if ( storage.error ) {
            setState( { error: storage.error } );
            return;
        }

        setState( { storage } );

    }, [] );
 
    return state;
 }
  
export default useStorage;