using LibMgmtAPI.Models;

namespace LibMgmtAPI.Interfaces
{
    public interface ILibraryManager
    {
        List<Library> GetLibraries();
        Library FindLibraryById(int id);
        List<Library> FindLibraryByName(string name);
        int AddLibrary(Library library);
        int UpdateLibrary(int id, Library library);
        int DeleteLibrary(int id);
    }
}
