create table if not exists User (
    username varvarchar(10) primary key,
    hashedPassword varchar(255) not null,
    backUpDate datetime not null,
    backUpSize BIGINT not null
)

create table if not exists File (   
    id varvarchar(10) primary key,
    username references to User.username,
    name varvarchar(50) not null,
    size BIGINT not null,
    fullPath text not null,

    UNIQUE (username, full_path)
)

create table if not exists Chunk (
    hashSha256 varchar(255) primary key,
    size BIGINT not null
)

create table if not exists File-Chunk (
    hashSha256 varchar(255) references to Chunk.hashSha256,
    fileId varvarchar(10) references to File.id,
    chunkOrder int not null,

    primary key(chunkOrder, fileId)
)
