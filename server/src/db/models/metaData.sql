create table if not exists User (
    username varvarchar(10) primary key,
    hashedPassword varchar(256) not null,
    backUpDate datetime not null,
    backUpSize BIGINT not null
)

create table if not exists File (
    fullPath text primary key,   
    size BIGINT not null,
)

create table if not exists Chunk (
    hashSha256 varchar(256) primary key
)

create table if not exists File-Chunk (
    hashSha256 varchar(256) references to Chunk.hashSha256,
    filePath varvarchar(10) references to File.fullPath,
    offset int not null,

    primary key(offset, fileId)
)
