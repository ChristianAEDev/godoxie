<template>
  <div>
    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="scan in scans" class='xs2' :key="scan.filename">
            <v-card>
              <v-card-media :src='`http://${doxieIP}/thumbnails/DOXIE/PDF/IMG_${scan.filename}.PDF`' height="150px">
              </v-card-media>
              <v-card-title primary-title>
                <div class='headline'>{{scan.filename}}</div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>save</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'landing-page',
  computed: {
    ...mapGetters(['status', 'doxieIP', 'scans'])
  }
}
</script>
