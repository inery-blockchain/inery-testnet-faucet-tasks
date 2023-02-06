#include <inery/inery.hpp>
#include <inery/print.hpp>
#include <string>

using namespace inery;
using std::string;

/**
* TABLES, MULTI_INDEX, CRUD
*/
class [[inery::contract]] contacts : public contract {
  
  public:
    using contract::contract;

    [[inery::action]]
    void insert(const name username, const string cname, const string cfamily, const string cphone, const string cemail) 
    {
      mycontacts tblMyContacts (get_self(), get_first_receiver().value);
      
      tblMyContacts.emplace(get_self(), [&]( auto& row ) {
        row.ID = tblMyContacts.available_primary_key();
        row.username = username;
        row.cname = cname;
        row.cfamily = cfamily;
        row.cphone = cphone;
        row.cemail = cemail;
      });
    }


    [[inery::action]]
    void get(const uint64_t id)
    {
      mycontacts tblMyContacts (get_self(), get_first_receiver().value);

      auto itr = tblMyContacts.find(id);
      print(itr->ID, ' ');
      print(itr->username, ' ');
      print(itr->cname, ' ');
      print(itr->cfamily, ' ');
      print(itr->cphone, ' ');
    }


    [[inery::action]]
    void getbyindex2(const name index)
    {
      mycontacts tblMyContacts (get_self(), get_first_receiver().value);

      auto scndindex = tblMyContacts.get_index<name("username")>();
      auto itr = scndindex.find(index.value);
      
      print(itr->ID, ' ');
      print(itr->username, ' ');
      print(itr->cname, ' ');
      print(itr->cfamily, ' ');
      print(itr->cphone, ' ');
    }


    [[inery::action]]
    void update(const uint64_t id, const string cname, const string cfamily, const string cphone, const string cemail) 
    {
      mycontacts tblMyContacts (get_self(), get_first_receiver().value);
      
      auto itr = tblMyContacts.find(id);
      
      tblMyContacts.modify(itr, get_self(), [&]( auto& row ) {
        row.cname = cname;
        row.cfamily = cfamily;
        row.cphone = cphone;
        row.cemail = cemail;
      });
    }


    [[inery::action]]
    void dlt(const uint64_t id){
      mycontacts tblMyContacts (get_self(), get_first_receiver().value);

      auto itr = tblMyContacts.find(id);
      itr = tblMyContacts.erase(itr);
    }


    [[inery::action]]
    void dltall(){
      mycontacts tblMyContacts (get_self(), get_first_receiver().value);

      auto itr = tblMyContacts.begin();
      while(itr != tblMyContacts.end()){
         itr = tblMyContacts.erase(itr);
      }
    }

  //-- END OF PUBLIC REGION


  private:
    /**
    * 1. Before deploying any changes done to table structure, you must empty the table first.
    * 2. Primary index is unique, whereas secondary indices could be duplicate
    */

    struct [[inery::table]] mycontact_tbl {
      uint64_t ID;
      name username;
      string cname;
      string cfamily;
      string cphone;
      string cemail;
      
      uint64_t primary_key() const { return ID; }
      uint64_t secondarykey() const { return username.value; }
    };
    
    typedef inery::multi_index< "mycontacts"_n, mycontact_tbl,
      inery::indexed_by< "username"_n, inery::const_mem_fun<mycontact_tbl, uint64_t, &mycontact_tbl::secondarykey>>
    > mycontacts;

  //-- END OF PRIVATE REGION

};
