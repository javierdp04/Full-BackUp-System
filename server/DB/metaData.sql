create table if not exists User (
    username varchar(10) primary key,
    backUpDate datetime not null,
    backUpSize BIGINT not null
)

create table if not exists File (
    id varchar(10) primary key,
    username references to User.username,
    name varchar(50) not null,
    size BIGINT not null,
    fullPath text not null,

    UNIQUE (username, full_path)
)

create table if not exists Chunk (
    hashSha256 CHAR(64) primary key,
    size BIGINT not null
)

create table if not exists File-Chunk (
    hashSha256 CHAR(64) references to Chunk.hashSha256,
    fileId varchar(10) references to File.id,
    chunkOrder int not null,

    primary key(chunkOrder, fileId)
)
