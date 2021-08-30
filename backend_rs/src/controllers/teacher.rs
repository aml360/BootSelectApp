use rocket::serde::json::Json;

#[get("/teachers")]
pub fn get_teachers() -> Json<bool> {
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
