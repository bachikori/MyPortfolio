'use strict'

{
    const firebaseConfig = {
        apiKey: "AIzaSyC1SitT90Kt7XJuFgQID3Y2ztvB8QHjWvE",
        authDomain: "my-free-chat.firebaseapp.com",
        projectId: "my-free-chat",
        storageBucket: "my-free-chat.appspot.com",
        messagingSenderId: "671621716828",
        appId: "1:671621716828:web:1e9daff9a60a8aaff13f99",
        measurementId: "G-Y0M9CHJLJ2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const db = firebase.firestore();
    const auth = firebase.auth();
    let me = null;

    const collection = db.collection('messages');


    const message = document.getElementById('message');
    const form = document.querySelector('form');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    const messages = document.getElementById('messages');
    let dd;



    login.addEventListener('click', () => {
        if (confirm('ログインしますか？')) {
            auth.signInAnonymously();
        }
    })

    logout.addEventListener('click', () => {
        if (confirm('ログアウトしますか？')) {
            auth.signOut();
        }
    })

    auth.onAuthStateChanged(user => { // ログイン状態の監視
        if (user) { // ログイン時の処理
            me = user;
            // console.log(me);

            while (messages.firstChild) {
                messages.removeChild(messages.firstChild);
            }

            collection.orderBy('created').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const li = document.createElement('li');
                        const div = document.createElement('div');
                        const d = change.doc.data();
                        dd = change.doc.id;

                        div.classList.add('text');

                        // 自分の投稿を右側に表示
                        if (me.uid === d.uid) {
                            li.classList.add('right-side');
                        } else {
                            li.classList.add('left-side');
                        }
                        div.textContent = d.uid.substr(0, 8) + ': ' + d.message;

                        li.appendChild(div);

                        div.addEventListener('click', () => {
                            if (li.classList.contains('right-side')) {
                                if (confirm('削除しますか?')) {
                                    collection.doc(dd).delete().then(() => {
                                        console.log("Document successfully deleted!")
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                    li.remove();
                                }
                            }
                        });
                        // collection.get().then(snapshot => {

                        //     // doc.idの配列を作る
                        //     // const docSnapshot = snapshot.docs;
                        //     // const items = docSnapshot.map(doc => doc.id);
                        //     // console.log(items);

                        //     // クリックした要素の削除
                        //     div.addEventListener('click', () => {
                        //         if (li.classList.contains('right-side')) {
                        //             if (confirm('削除しますか?')) {
                        //                 items.forEach(function(item, index) {
                        //                     collection.doc(items[index]).delete().then(() => {
                        //                         console.log("Document successfully deleted!")
                        //                     }).catch((error) => {
                        //                         console.log(error);
                        //                     })

                        //                 });

                        //             }
                        //         }
                        //     });
                        // })

                        messages.appendChild(li);
                    }
                });

            }, error => { });
            console.log(`Logged in as: ${user.uid}`);
            login.classList.add('hidden');
            [logout, form, messages].forEach(el => {
                el.classList.remove('hidden');
            })
            message.focus();
            return;
        }
        me = null;
        console.log(`Nobody is logged in`); // ログアウト時の処理
        login.classList.remove('hidden');
        [logout, form, messages].forEach(el => {
            el.classList.add('hidden');
        })
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        const val = message.value.trim();
        if (val === "") {
            return;
        }

        // const li = document.createElement('li');
        // li.textContent = val;
        // messages.appendChild(li);

        message.value = '';
        message.focus();

        collection.add({
            message: val,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            uid: me ? me.uid : 'nobody' // meが真の時me.uid meがnullの時nobody  uidを保存
        })
            .then(doc => {
                console.log(`${doc.id} added!`);
                // todos.push(doc.id);
                // console.log(items);
                // console.log(items[1]);


            })
            .catch(error => {
                console.log('document add error!');
                console.log(error);
            })
    })

    console.log(collection.doc.id);

    message.focus();

}