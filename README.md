# C# Projects Collection

This repository contains various C# projects including console applications, web applications, and games.

### Setup Commands

#### 1. Install Entity Framework Core tools globally
```bash
dotnet tool install --global dotnet-ef
```

#### 2. Restore dependencies
```bash
dotnet restore
```

#### 3. Build the project
```bash
dotnet build
```

### Database Operations

#### Create a migration
```bash
dotnet ef migrations add InitialCreate
```

#### Update database with latest migrations
```bash
dotnet ef database update
```

#### Remove last migration (if not applied to database)
```bash
dotnet ef migrations remove
```

#### Generate SQL script for migrations
```bash
dotnet ef migrations script
```

#### List all migrations
```bash
dotnet ef migrations list
```

### Database Connection

The application connects to SQL Server using the connection string in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnectionString": "Data Source=localhost,1433;Initial Catalog=FinanceApp;User ID=sa;Password=secret;Trust Server Certificate=True"
}
```

#### Connection Parameters:
- **Server**: localhost,1433
- **Database**: FinanceApp
- **Authentication**: SQL Server Authentication
- **Username**: sa
- **Password**: secret
- **Trust Server Certificate**: true

### Running the Application

#### Development mode
```bash
dotnet run
```

#### Production build
```bash
dotnet publish -c Release
```

### Useful Commands

#### View available commands
```bash
dotnet ef --help
```

#### Check database connection
```bash
dotnet ef dbcontext info
```

#### Drop database (careful!)
```bash
dotnet ef database drop
```

#### Update database to specific migration
```bash
dotnet ef database update MigrationName
```

### Future Projects Guide

When starting new projects, use these commands as a reference:

1. **New Web API**: `dotnet new webapi -n ProjectName`
2. **New MVC App**: `dotnet new mvc -n ProjectName`
3. **New Console App**: `dotnet new console -n ProjectName`
4. **Add EF Core**: `dotnet add package Microsoft.EntityFrameworkCore`
5. **Add SQL Server**: `dotnet add package Microsoft.EntityFrameworkCore.SqlServer`
6. **Add EF Tools**: `dotnet add package Microsoft.EntityFrameworkCore.Tools`

### Troubleshooting

- **Migration errors**: Ensure database connection is working
- **Build errors**: Check .NET version compatibility
- **Runtime errors**: Verify connection string and database existence