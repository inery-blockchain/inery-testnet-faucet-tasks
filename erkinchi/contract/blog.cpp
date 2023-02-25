#include <inery/inery.hpp>
#include <inery/print.hpp>
#include <string>

using namespace inery;
using std::string;


class [[inery::contract("blog")]] blog : public contract {
public:
    using contract::contract;

    [[inery::action]]
    void create(const std::string title, const std::string body) {

        post_table posts(get_self(), get_self().value);

        posts.emplace(_self, [&](auto& post) {
            post.id = posts.available_primary_key();
            post.title = title;
            post.body = body;
            post.likes = 0;
        });
    }

    [[inery::action]]
    void edit(const uint64_t post_id, const std::string title, const std::string body) {

        post_table posts(get_self(), get_self().value);

        auto& post = posts.get(post_id, "Post does not exist");

        posts.modify(post, _self, [&](auto& p) {
            p.title = title;
            p.body = body;
        });
    }


    [[inery::action]]
    void remove(const uint64_t post_id) {

        post_table posts(get_self(), get_self().value);

        auto& post = posts.get(post_id, "Post does not exist");

        posts.erase(post);
    }

    [[inery::action]]
    void like(const uint64_t post_id) {

        post_table posts(get_self(), get_self().value);

        auto& post = posts.get(post_id, "Post does not exist");

        posts.modify(post, _self, [&](auto& p) {
            p.likes += 1;
        });
    }

private:
    struct [[inery::table]] post {
        uint64_t id;
        std::string title;
        std::string body;
        uint64_t likes;

        uint64_t primary_key() const { return id; }
    };

    typedef inery::multi_index<name("posts"), post> post_table;
};
