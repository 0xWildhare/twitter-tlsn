fn main(x: Field, y: pub Field) {
    assert(x != y);
    //this would verify that the notary bls signature was valid, and that the correct data was included
}

#[test]
fn test_main() {
    main(1, 2);
    // Uncomment to make test fail
    // main(1, 1);
}
