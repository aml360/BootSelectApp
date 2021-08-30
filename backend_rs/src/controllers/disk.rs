use rocket::{form::Form, serde::json::Json};

#[derive(FromForm)]
pub struct DiskToUpdate {
    pub id: u32,
    pub description: String,
    // ordenador: Ordenador,
    // bootUp: Date;
    // shutdown: Date;
}

// const disksRoutes: [fn() -> rocket::serde::json::Json<bool>] = [update_disk_time];

#[put("/timeupdate", data = "<disk>")]
pub fn update_disk_time(disk: Form<DiskToUpdate>) -> Json<bool> {
    println!(
        "Descripción del disco {}, Id del disco {}",
        disk.description, disk.id
    );
    // TODO: Write function in rust
    // Ts function:
    // async updateDiskTime(@Body() disk: Disco): Promise<boolean> {
    // 	var diskToUpdate = await this.diskRepo.findOne({ id: disk.id });
    // 	if (!diskToUpdate) {
    // 		throw new NotFoundException('No existe ningun disco con ese id');
    // 	}
    // 	diskToUpdate.bootUp = disk.bootUp;
    // 	diskToUpdate.shutdown = disk.shutdown;
    // 	await this.diskRepo.save(diskToUpdate);
    // 	return true;
    // }
    Json(true)
}
