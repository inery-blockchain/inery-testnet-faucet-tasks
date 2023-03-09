#include <inery/inery.hpp>
#include <string>

using namespace inery;
using namespace std;

class [[inery::contract("todocrud")]] todocrud : public contract {
    public:
        using contract::contract;
        todocrud(name reciever, name code, datastream<const char*> ds ) : contract(reciever, code, ds) {}

	struct [[inery::table("records")]] records {
		uint64_t	id;
		name	owner;
		string	data;
		uint64_t primary_key() const {return id; }
	};
	typedef inery::multi_index<"records"_n, records> table_inst0;


	[[inery::action]] void crrecords (name owner, string data) {
		table_inst0  records(get_self(), get_self().value);
		records.emplace(get_self(), [&](auto &row){
			row.id = records.available_primary_key();
			row.owner = owner;
			row.data = data;
		});
	}
	[[inery::action]] void uprecords (uint64_t id, name owner, string data) {
		table_inst0  records(get_self(), get_self().value);
		auto itr = records.find(id);
		check(itr != records.end(), "No entity with that id ");
		records.modify(itr, get_self(), [&](auto &row){
			row.owner = owner;
			row.data = data;
		});
	}
	[[inery::action]] void dlrecords (uint64_t id) {
		table_inst0  records(get_self(), get_self().value);
		auto itr = records.find(id);
		check(itr != records.end(), "No entity with that id ");
		records.erase(itr);
	}
};