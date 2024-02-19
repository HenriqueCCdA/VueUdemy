<template>
  <section>
    <h2>My Friends</h2>
    <ul>
      <li></li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        {
          id: 'manuel',
          name: 'Manuel Lorenz',
          phone: '01234 45678 90',
          email: 'manuel@localhost.com',
        },
        {
          id: 'julie',
          name: 'Julie Jone',
          phone: '0987 65421 21',
          email: 'juliel@localhost.com',
        },
      ]
    }
  },
}

</script>
