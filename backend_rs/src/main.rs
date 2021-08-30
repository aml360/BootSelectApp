#[macro_use]
extern crate rocket;

//Uses
use rocket::fs::{relative, FileServer};
use rocket::serde::json::Json;

use crate::controllers::{auth::signin, disk::update_disk_time, teacher::get_teachers};
//Mods
mod controllers;

macro_rules! BASE_PATH {
    () => {
        "/api"
    };
}

#[get("/world")]
fn hi() -> Json<&'static str> {
    Json("Hola")
}

// const base_path: &'static str = "/api";

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", FileServer::from(relative!("/front_dist")))
        .mount(BASE_PATH!(), routes![hi])
        .mount(concat!(BASE_PATH!(), "/auth"), routes![signin])
        .mount(concat!(BASE_PATH!(), "/disks"), routes![update_disk_time])
        .mount(concat!(BASE_PATH!(), "/teachers"), routes![get_teachers])
}
