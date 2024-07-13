use dep::std::hash::poseidon::bn254;

fn main(x: Field, hash: pub Field) {
    let secret = [x, 5];
    assert(hash == bn254::hash_2(secret));
} // in practice this would verify the signature and content of the data

#[test]
fn test_main() {
    main(
        6,
        0x10b9585a06567668b95573519c57cf6ca6ed63c533b354292f21715431751052
    );
}

#[test(should_fail)]
fn test_fail() {
    main(
        3,
        0x10b9585a06567668b95573519c57cf6ca6ed63c533b354292f21715431751052
    )
}
